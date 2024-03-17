import PropTypes from 'prop-types';

import SurveyForm from './addSurvey/surveyForm';

ModalAddSurvey.propTypes = {
    status: PropTypes.bool,
    close: PropTypes.func,
    reload: PropTypes.func,
}

export default function ModalAddSurvey({status, close, reload}) {

    return (
        <SurveyForm status={status} mode closeModal={close} reload={reload} />
    ); 
}