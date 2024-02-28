import { Alert } from "@mui/material";

export default function Message(props) {
  const {severity, message} = props
  return (
    <Alert className='mb-2' severity={severity}>
      {message}
    </Alert>
  )
}
