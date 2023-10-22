import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ test }) {
    const navigate = useNavigate()
    return <Button onClick={() => navigate(test)}>test</Button>
}