---
layout: model
title: NER Pipeline for Clinical Problems (reduced taxonomy) - Voice of the Patient
author: John Snow Labs
name: ner_vop_problem_reduced_pipeline
date: 2023-06-22
tags: [licensed, pipeline, ner, en, vop, problem]
task: Named Entity Recognition
language: en
edition: Healthcare NLP 4.4.4
spark_version: 3.4
supported: true
annotator: PipelineModel
article_header:
  type: cover
use_language_switcher: "Python-Scala-Java"
---

## Description

This pipeline extracts mentions of clinical problems from health-related text in colloquial language. All problem entities are merged into one generic Problem class.

## Predicted Entities



{:.btn-box}
<button class="button button-orange" disabled>Live Demo</button>
<button class="button button-orange" disabled>Open in Colab</button>
[Download](https://s3.amazonaws.com/auxdata.johnsnowlabs.com/clinical/models/ner_vop_problem_reduced_pipeline_en_4.4.4_3.4_1687441192248.zip){:.button.button-orange.button-orange-trans.arr.button-icon.hidden}
[Copy S3 URI](s3://auxdata.johnsnowlabs.com/clinical/models/ner_vop_problem_reduced_pipeline_en_4.4.4_3.4_1687441192248.zip){:.button.button-orange.button-orange-trans.button-icon.button-copy-s3}

## How to use

<div class="tabs-box" markdown="1">
{% include programmingLanguageSelectScalaPythonNLU.html %}
```python
from sparknlp.pretrained import PretrainedPipeline

pipeline = PretrainedPipeline("ner_vop_problem_reduced_pipeline", "en", "clinical/models")

pipeline.annotate("
I've been experiencing joint pain and fatigue lately, so I went to the rheumatology department. After some tests, they diagnosed me with rheumatoid arthritis and started me on a treatment plan to manage the symptoms.
")
```
```scala
import com.johnsnowlabs.nlp.pretrained.PretrainedPipeline

val pipeline = new PretrainedPipeline("ner_vop_problem_reduced_pipeline", "en", "clinical/models")

val result = pipeline.annotate("
I've been experiencing joint pain and fatigue lately, so I went to the rheumatology department. After some tests, they diagnosed me with rheumatoid arthritis and started me on a treatment plan to manage the symptoms.
")
```
</div>

<div class="tabs-box" markdown="1">
{% include programmingLanguageSelectScalaPythonNLU.html %}
```python
from sparknlp.pretrained import PretrainedPipeline

pipeline = PretrainedPipeline("ner_vop_problem_reduced_pipeline", "en", "clinical/models")

pipeline.annotate("
I've been experiencing joint pain and fatigue lately, so I went to the rheumatology department. After some tests, they diagnosed me with rheumatoid arthritis and started me on a treatment plan to manage the symptoms.
")
```
```scala
import com.johnsnowlabs.nlp.pretrained.PretrainedPipeline

val pipeline = new PretrainedPipeline("ner_vop_problem_reduced_pipeline", "en", "clinical/models")

val result = pipeline.annotate("
I've been experiencing joint pain and fatigue lately, so I went to the rheumatology department. After some tests, they diagnosed me with rheumatoid arthritis and started me on a treatment plan to manage the symptoms.
")
```
</div>

## Results

```bash
Results


| chunk                | ner_label   |
|:---------------------|:------------|
| pain                 | Problem     |
| fatigue              | Problem     |
| rheumatoid arthritis | Problem     |


{:.model-param}
```

{:.model-param}
## Model Information

{:.table-model}
|---|---|
|Model Name:|ner_vop_problem_reduced_pipeline|
|Type:|pipeline|
|Compatibility:|Healthcare NLP 4.4.4+|
|License:|Licensed|
|Edition:|Official|
|Language:|en|
|Size:|791.6 MB|

## Included Models

- DocumentAssembler
- SentenceDetectorDLModel
- TokenizerModel
- WordEmbeddingsModel
- MedicalNerModel
- NerConverter