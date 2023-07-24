import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from './Skeleton'
import { addUser } from "../store";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";


const UsersList = () => {
    const [dofetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
    const [docreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

    const { data } = useSelector((state) => {
        return state.users;
    })

    useEffect(() => {
        dofetchUsers();
    }, [dofetchUsers])

    const handleUserAdd = () => {
        docreateUser()
    }
    let content;
    if (isLoadingUsers) {
        content = <Skeleton times={6} className='h-10 w-full' />
    } else if (loadingUsersError) {
        content = <div>Error Fetching Data....</div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />
        })
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center  m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>
                    + Add User
                </Button>
                {creatingUserError && 'Error creating User...'}

            </div>
            {content}
        </div>
    )
}

export default UsersList;