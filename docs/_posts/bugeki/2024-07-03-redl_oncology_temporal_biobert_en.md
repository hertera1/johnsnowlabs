---
layout: model
title: Relation Extraction between dates and other entities (ReDL)
author: John Snow Labs
name: redl_oncology_temporal_biobert
date: 2024-07-03
tags: [licensed, en, clinical, oncology, relation_extraction, tensorflow, temporal]
task: Relation Extraction
language: en
edition: Healthcare NLP 5.4.0
spark_version: 3.0
supported: true
engine: tensorflow
annotator: RelationExtractionDLModel
article_header:
  type: cover
use_language_switcher: "Python-Scala-Java"
---

## Description

This relation extraction model links `Date` and `Relative_Date` extractions to clinical entities such as `Test` or `Cancer_Dx`.

## Predicted Entities

`is_date_of`, `O`

{:.btn-box}
<button class="button button-orange" disabled>Live Demo</button>
<button class="button button-orange" disabled>Open in Colab</button>
[Download](https://s3.amazonaws.com/auxdata.johnsnowlabs.com/clinical/models/redl_oncology_temporal_biobert_en_5.4.0_3.0_1720042270107.zip){:.button.button-orange.button-orange-trans.arr.button-icon.hidden}
[Copy S3 URI](s3://auxdata.johnsnowlabs.com/clinical/models/redl_oncology_temporal_biobert_en_5.4.0_3.0_1720042270107.zip){:.button.button-orange.button-orange-trans.button-icon.button-copy-s3}

## How to use

Each relevant relation pair in the pipeline should include one date entity (`Date` or `Relative_Date`) and a clinical entity (such as `Pathology_Test`, `Cancer_Dx` or `Chemotherapy`).


<div class="tabs-box" markdown="1">
{% include programmingLanguageSelectScalaPythonNLU.html %}
  
```python

document_assembler = DocumentAssembler()\
    .setInputCol("text")\
    .setOutputCol("document")

sentence_detector = SentenceDetectorDLModel.pretrained("sentence_detector_dl_healthcare","en","clinical/models")\
    .setInputCols(["document"])\
    .setOutputCol("sentence")

tokenizer = Tokenizer() \
    .setInputCols(["sentence"]) \
    .setOutputCol("token")

word_embeddings = WordEmbeddingsModel().pretrained("embeddings_clinical", "en", "clinical/models")\
    .setInputCols(["sentence", "token"]) \
    .setOutputCol("embeddings")                

ner = MedicalNerModel.pretrained("ner_oncology_wip", "en", "clinical/models") \
    .setInputCols(["sentence", "token", "embeddings"]) \
    .setOutputCol("ner")

ner_converter = NerConverterInternal() \
    .setInputCols(["sentence", "token", "ner"]) \
    .setOutputCol("ner_chunk")
          
pos_tagger = PerceptronModel.pretrained("pos_clinical", "en", "clinical/models") \
    .setInputCols(["sentence", "token"]) \
    .setOutputCol("pos_tags")

dependency_parser = DependencyParserModel.pretrained("dependency_conllu", "en") \
    .setInputCols(["sentence", "pos_tags", "token"]) \
    .setOutputCol("dependencies")

re_ner_chunk_filter = RENerChunksFilter()\
    .setInputCols(["ner_chunk", "dependencies"])\
    .setOutputCol("re_ner_chunk")\
    .setMaxSyntacticDistance(10)\
    .setRelationPairs(["Cancer_Dx-Date", "Date-Cancer_Dx", "Relative_Date-Cancer_Dx", "Cancer_Dx-Relative_Date", "Cancer_Surgery-Date", "Date-Cancer_Surgery", "Cancer_Surgery-Relative_Date", "Relative_Date-Cancer_Surgery"])

re_model = RelationExtractionDLModel.pretrained("redl_oncology_temporal_biobert", "en", "clinical/models")\
    .setInputCols(["re_ner_chunk", "sentence"])\
    .setOutputCol("relation_extraction")
        
pipeline = Pipeline(stages=[document_assembler,
                            sentence_detector,
                            tokenizer,
                            word_embeddings,
                            ner,
                            ner_converter,
                            pos_tagger,
                            dependency_parser,
                            re_ner_chunk_filter,
                            re_model])

data = spark.createDataFrame([["Her breast cancer was diagnosed last year."]]).toDF("text")

result = pipeline.fit(data).transform(data)

```
```scala

val document_assembler = new DocumentAssembler()
    .setInputCol("text")
    .setOutputCol("document")
    
val sentence_detector = SentenceDetectorDLModel.pretrained("sentence_detector_dl_healthcare","en","clinical/models")
    .setInputCols("document")
    .setOutputCol("sentence")
    
val tokenizer = new Tokenizer()
    .setInputCols("sentence")
    .setOutputCol("token")
    
val word_embeddings = WordEmbeddingsModel().pretrained("embeddings_clinical", "en", "clinical/models")
    .setInputCols(Array("sentence", "token"))
    .setOutputCol("embeddings")                
    
val ner = MedicalNerModel.pretrained("ner_oncology_wip", "en", "clinical/models")
    .setInputCols(Array("sentence", "token", "embeddings"))
    .setOutputCol("ner")
    
val ner_converter = new NerConverterInternal()
    .setInputCols(Array("sentence", "token", "ner"))
    .setOutputCol("ner_chunk")

val pos_tagger = PerceptronModel.pretrained("pos_clinical", "en", "clinical/models")
    .setInputCols(Array("sentence", "token"))
    .setOutputCol("pos_tags")
    
val dependency_parser = DependencyParserModel.pretrained("dependency_conllu", "en")
    .setInputCols(Array("sentence", "pos_tags", "token"))
    .setOutputCol("dependencies")

val re_ner_chunk_filter = new RENerChunksFilter()
     .setInputCols(Array("ner_chunk", "dependencies"))
     .setOutputCol("re_ner_chunk")
     .setMaxSyntacticDistance(10)
     .setRelationPairs(Array("Cancer_Dx-Date", "Date-Cancer_Dx", "Relative_Date-Cancer_Dx", "Cancer_Dx-Relative_Date", "Cancer_Surgery-Date", "Date-Cancer_Surgery", "Cancer_Surgery-Relative_Date", "Relative_Date-Cancer_Surgery"))

val re_model = RelationExtractionDLModel.pretrained("redl_oncology_temporal_biobert", "en", "clinical/models")
      .setPredictionThreshold(0.5f)
      .setInputCols(Array("re_ner_chunk", "sentence"))
      .setOutputCol("relation_extraction")

val pipeline = new Pipeline().setStages(Array(document_assembler,
                            sentence_detector,
                            tokenizer,
                            word_embeddings,
                            ner,
                            ner_converter,
                            pos_tagger,
                            dependency_parser,
                            re_ner_chunk_filter,
                            re_model))

val data = Seq("Her breast cancer was diagnosed last year.").toDS.toDF("text")

val result = pipeline.fit(data).transform(data)

```
</div>

## Results

```bash

+----------+---------+-------------+-----------+-------------+-------------+-------------+-----------+---------+----------+
|  relation|  entity1|entity1_begin|entity1_end|       chunk1|      entity2|entity2_begin|entity2_end|   chunk2|confidence|
+----------+---------+-------------+-----------+-------------+-------------+-------------+-----------+---------+----------+
|is_date_of|Cancer_Dx|            4|         16|breast cancer|Relative_Date|           32|         40|last year| 0.9999256|
+----------+---------+-------------+-----------+-------------+-------------+-------------+-----------+---------+----------+
 
```

{:.model-param}
## Model Information

{:.table-model}
|---|---|
|Model Name:|redl_oncology_temporal_biobert|
|Compatibility:|Healthcare NLP 5.4.0+|
|License:|Licensed|
|Edition:|Official|
|Input Labels:|[re_ner_chunk, sentence]|
|Output Labels:|[relation_extraction]|
|Language:|en|
|Size:|405.4 MB|

## References

In-house annotated oncology case reports.

## Benchmarking

```bash
     label  recall  precision   f1  support
         O    0.77       0.81 0.79    302.0
is_date_of    0.82       0.78 0.80    298.0
 macro-avg    0.79       0.79 0.79      -
```

