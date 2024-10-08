import React from 'react';
import ModelItemTag from '../ModelItemTag';
import { addNamingConventions } from './utils';
import './ModelItem.css';

const MarketplaceIcon = ({ platform, deployLink }) => (
  <div>
    {deployLink ? <a target="_blank" href={`${deployLink}`}>
      <figure><img src={`/assets/images/posts_image/active_${platform}.svg`} alt="" /></figure>
    </a> : <figure><img src={`/assets/images/posts_image/inactive_${platform}.svg`} alt="" /></figure>
    }
  </div>
)

const ModelItemMarketplace = ({ snowflake, databricks, sagemaker }) => (
  <div className="model-item__footer">
    <MarketplaceIcon platform="sagemaker" deployLink={sagemaker} />
    <MarketplaceIcon platform="snowflake" deployLink={snowflake} />
    <MarketplaceIcon platform="databricks" deployLink={databricks} />
  </div>
)

const ModelItem = ({
  title,
  url,
  task,
  language,
  edition,
  date,
  supported,
  recommended,
  deprecated,
  highlight,
  marketplace,
}) => {
  let body;
  if (highlight && highlight.body && highlight.body[0]) {
    body = highlight.body[0];
  }

  const getDisplayedDate = () => {
    const [year, month] = date.split('-');
    return month + '.' + year;
  };

  let label;
  if (deprecated) {
    label = <div className="model-item__deprecated">Deprecated</div>;
  } else if (supported) {
    label = <div className="model-item__supported">Supported</div>;
  }

  return (
    <div className="cell cell--12 cell--md-6 cell--lg-4">
      <div className="model-item">
        {label}
        {recommended && (
          <span className="fa fa-star model-item__recommended"></span>
        )}
        <div className="model-item__header">
          <a href={url} className="model-item__title">
            {addNamingConventions(title)}
          </a>
        </div>
        <div className="model-item__content">
          {body && (
            <div
              className="model-item__highlight"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
          <ModelItemTag
            icon="calendar-alt"
            name="Date"
            value={getDisplayedDate()}
          />
          <ModelItemTag
            icon="edit"
            name="task"
            value={Array.isArray(task) ? task.join(', ') : task}
          />
          <ModelItemTag icon="flag" name="Language" value={language} />
          <ModelItemTag icon="clone" name="Edition" value={edition} />
        </div>

        {marketplace && <ModelItemMarketplace {...marketplace} />}
      </div>
    </div>
  );
};

export default ModelItem;
