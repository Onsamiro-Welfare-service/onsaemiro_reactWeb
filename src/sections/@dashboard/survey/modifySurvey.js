import PropTypes from 'prop-types';

import ModifySurveyForm from './modifySurvey/modifySurveyForm';

ModalModifySurvey.propTypes = {
    status: PropTypes.bool,
    data: PropTypes.object,
    close: PropTypes.func,
}

export default function ModalModifySurvey({status, data, close}) {

    return (
        <ModifySurveyForm status={status} mode={false} data={data} closeModal={close} />
    ); 
}