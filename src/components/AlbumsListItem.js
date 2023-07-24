import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import React from "react";
import PhotosList from "./PhotosList";



const AlbumsListItem = ({ album }) => {
    const [removeAlbum, results] = useRemoveAlbumMutation();
    const handleRemoveAlbum = () => {
        removeAlbum(album)
    }
    const header = <React.Fragment>
        <Button onClick={handleRemoveAlbum} loading={results.isLoading} className='mr-2'>
            <GoTrashcan />
        </Button>
        {album.title}
    </React.Fragment>
    return <ExpandablePanel key={album.id} header={header} >
        <PhotosList album={album}/>
    </ExpandablePanel>
}

export default AlbumsListItem;