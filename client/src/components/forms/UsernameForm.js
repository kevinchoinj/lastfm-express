import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import {connect} from 'react-redux';

const RenderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <input {...input}
      placeholder={placeholder}
      type={type}
      className="username_input"
    />
    {touched &&
      ((error && <span className="form_error">{error}</span>) ||
        (warning && <span className="form_error">{warning}</span>))}
  </div>
)

class UsernameForm extends React.Component {
  render() {
    const { handleSubmit,
      error,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} autoComplete="off" className="username_form">

        <div className="username_label">
          Last.fm Username
        </div>
        <Field
          name="username"
          component={RenderField}
          placeholder="Shodyra"
          type="text"
        />

        {error && <div className="form_error">{error}</div>}
        <button
          type="submit"
          className="username_button"
        >
          Submit
        </button>

      </form>
    );
  }
}

function mapStateToProps(state, prop){
  return{
    initialValues: {
    },
  }
}
function mapDispatchToProps(dispatch){
  return {
  }
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('adminBasic'));

UsernameForm = reduxForm({
  form: 'adminBasic',
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(UsernameForm);

export default connect(mapStateToProps, mapDispatchToProps)(UsernameForm);
