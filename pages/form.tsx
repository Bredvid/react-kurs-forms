import { useState, ChangeEvent } from "react";

const initialFormData: FormState = {
  name: "",
  phoneNumber: "",
  email: "", 
  birthDate: "",
  picture: null, 
  sex: null,
  acceptedTerms: false,
}

type FormState = {
  name: string,
  phoneNumber: string,
  email: string,
  birthDate: string,
  picture: any,
  sex: 'male' | 'female' | 'other',
  acceptedTerms: boolean
}

const Form = () => {

  const [formData, setFormData] = useState(initialFormData)
  const [submitStatus, setSubmitStatus] = useState({isError: false, isSubmitting: false, hasSubmitted: false})

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => 
    setFormData({...formData, [e.target.name]: e.target.value})
  
  const handleCheckbox = () => 
    setFormData({...formData, acceptedTerms: !formData.acceptedTerms})
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus({...submitStatus, isSubmitting: true})
    fetch('api/form', 
      {
        method: 'post',
        body: JSON.stringify(formData)
      })
      .then(res => res.ok ? handleSubmitSuccess()
        : setSubmitStatus({isError: true, isSubmitting: false, hasSubmitted: false})
      )
      .catch(e => {
        setSubmitStatus({isError: true, isSubmitting: false, hasSubmitted: false})
      } )
  }

  const handleSubmitSuccess = () => {
    setSubmitStatus({isError: false, isSubmitting: false, hasSubmitted: true})
    setFormData(initialFormData)
  }


  const newForm = () => {
    setFormData(initialFormData)
    setSubmitStatus({...submitStatus, hasSubmitted: false})
  }

  return (
    <div className="container">
      <h1>Form</h1>
      {!submitStatus.hasSubmitted ? 
      <form
        method="post"
        onSubmit={handleSubmit}       
      >
        <div className="d-flex flex-column">
          <label className="d-flex flex-column w-50">
           Navn
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
          </label>
          
          <label className="d-flex flex-column w-50">
            <span className="mr-2">E-post</span>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">Telefonnummer</span>
            <input
              type="string"
              name="phoneNumber"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
          </label>
          <label className="d-flex flex-column w-50">
            <span className="mr-2">Fødselsdato</span>
            <input
              type="date"
              name="birthDate"
              onChange={handleChange}
              value={formData.birthDate}
            />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">Last opp et portrettbile</span>
            <input
              type="file"
              name="picture"
              onChange={handleChange}
              value={formData.picture}
            />
          </label>

          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="radio"
              name="sex"
              value="female"
              onChange={handleChange}
            />
            Kvinne
          </label>
          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="radio"
              name="sex"
              value="male"
              onChange={handleChange}
            />
            Mann
          </label>
          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="radio"
              name="sex"
              value="other"
              onChange={handleChange}
            />
            Annet
          </label>

          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="checkbox"
              value="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleCheckbox}
            />
            Godta vilkår
          </label>
        </div>

        <button className="btn btn-primary btn-sm" disabled={submitStatus.isSubmitting}>Submit{submitStatus.isSubmitting && 'ting..'}</button>
      </form> 
      :
      <p>Skjemaet et er sendt inn, trykk <a style={{color: 'blue'}} onClick={newForm}>her</a> for å sende inn et nytt skjema</p> }

      {submitStatus.isError &&
      <div className="alert alert-dismissible alert-danger">
        <strong>Ojsann!</strong> <a href="#" className="alert-link">Noe gikk galt, prøv en gang til. </a>
      </div>
      } 
    </div>
  );
};

export default Form;
