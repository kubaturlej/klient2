import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";


const TeamMainPage = () => {

    const { id } = useParams<{ id: string }>();

    return (
        <>
        <h2>{id}</h2>
        </>
    )
};

export default observer(TeamMainPage);