import { GoTrashcan } from "react-icons/go";
import Button from './Button'
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import React from "react";
import AlbumsList from "./AlbumsList";

const UsersListItem = ({ user }) => {

    const [doRemoveUser, isLoading, error] = useThunk(removeUser)
    const handleClick = () => {
        doRemoveUser(user)
    }

    const header = <React.Fragment>
        <Button loading={isLoading} onClick={handleClick} className='mr-3'>
            <GoTrashcan />
        </Button>
        {error && <div>Error deleting User..</div>}
        {user.name}
    </React.Fragment>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>

    )
}

export default UsersListItem;