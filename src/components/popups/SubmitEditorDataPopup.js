/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';

import Popup from 'reactjs-popup';
import Select from 'react-select';
import ReactSwitch from 'react-switch';

import './SubmitEditorDataPopup.css';
import { MapCategories, MapRegions } from '../MapFeatures';
import { t } from '../Localization';

const SubmitEditorDataPopup = ({ trigger, onConfirm }) => {
  const [submissionName, setSubmissionName] = React.useState('');
  const [submissionRegion, setSubmissionRegion] = React.useState('');
  const [submissionCategory, setSubmissionCategory] = React.useState('');
  const [clusterMarkers, setClusterMarkers] = React.useState(false);

  const isValid = () => {
    return submissionName !== '' && submissionRegion !== '' && submissionCategory !== '';
  };

  const regionOptions = Object.keys(MapRegions).map((key) => {
    const value = MapRegions[key];
    return { value: key, label: value.name };
  });

  const categoryOptions = Object.keys(MapCategories).map((key) => {
    const value = MapCategories[key];
    return { value: key, label: value.name };
  });

  const onClickConfirm = (closePopup) => () => {
    if (!isValid) return;

    onConfirm({
      name: submissionName,
      region: submissionRegion,
      category: submissionCategory,
      cluster: clusterMarkers,
      icon: {
        filter: 'none',
        base: {
          marker: true,
          key: 'none',
        },
        done: {
          marker: true,
          done: true,
          key: 'none',
        },
      },
    });
    closePopup();
  };

  // NOTE: className on popup gets overridden with <class>-content, -overlay, and -arrow.
  return (
    <Popup
      trigger={trigger}
      className={clsx('popup-submit-editor-data')}
      modal
      position="center center"
      closeOnEscape
    >
      {(closePopup) => (
        <div className={clsx('popup-submit-editor-data-container')}>
          <span className={clsx('popup-submit-editor-data-header')}>
            {t('popup-submit-editor-data-title')}
          </span>
          <span className={clsx('popup-submit-editor-data-form-content')}>
            <div className={clsx('popup-submit-editor-data-field-container', 'margin-bottom')}>
              <span>{t('feature-name')}</span>
              <input
                type="text"
                value={submissionName}
                onChange={(event) => setSubmissionName(event.target.value)}
              />
            </div>
            <div className={clsx('popup-submit-editor-data-field-container')}>
              <span>{t('category')}</span>
              <Select
                className={clsx('popup-submit-editor-data-field-dropdown')}
                options={categoryOptions}
                value={submissionCategory}
                onChange={(value) => setSubmissionCategory(value)}
              />
            </div>
            <div className={clsx('popup-submit-editor-data-field-container')}>
              <span>{t('region')}</span>
              <Select
                className={clsx('popup-submit-editor-data-field-dropdown')}
                options={regionOptions}
                value={submissionRegion}
                onChange={(value) => setSubmissionRegion(value)}
              />
            </div>
            <span className={clsx('popup-submit-editor-data-field-subtitle', 'margin-bottom')}>
              {t('popup-clear-map-data-subtitle-a')}
            </span>
            <div className={clsx('popup-submit-editor-data-field-container')}>
              <span>{t('popup-submit-editor-data-cluster-markers')}</span>
              <ReactSwitch
                onChange={(value) => setClusterMarkers(value)}
                checked={clusterMarkers}
              />
            </div>
            <span className={clsx('popup-submit-editor-data-field-subtitle')}>
              {t('popup-clear-map-data-subtitle-b')}
            </span>
          </span>
          <div className={clsx('popup-submit-editor-data-button-container')}>
            <div
              role="button"
              aria-label={t('cancel')}
              tabIndex={0}
              onClick={closePopup}
              className={clsx(
                'popup-submit-editor-data-button',
                'popup-submit-editor-data-button-cancel'
              )}
            >
              {t('cancel')}
            </div>
            <div
              role="button"
              aria-label={t('confirm')}
              tabIndex={0}
              onClick={onClickConfirm(closePopup)}
              className={clsx(
                'popup-submit-editor-data-button',
                isValid()
                  ? 'popup-submit-editor-data-button-confirm-enabled'
                  : 'popup-submit-editor-data-button-confirm-disabled'
              )}
            >
              {t('confirm')}
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default SubmitEditorDataPopup;
