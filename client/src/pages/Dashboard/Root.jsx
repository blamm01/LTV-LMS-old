import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ test }) {
  useEffect(() => {
    document.title = "LTV LMS - Bảng điều khiển"
  }, [])
  const navigate = useNavigate()
  return <Button onClick={() => navigate(test)}>test</Button>
}