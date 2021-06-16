import { loadGetInitialProps } from "next/dist/next-server/lib/utils"



export const FormList = (props) => {
    return (
        <div>
            {props.forms.map((f, i) => <Form key={i} form={f}/>)}
        </div>
    )
}

const Form = (props) => <div>{props.form.name} - {props.form.phoneNumber}</div>