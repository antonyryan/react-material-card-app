import React, {useState, useRef} from 'react';
import {Icon, IconButton, Paper, MenuItem, TextField} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';
import {makeStyles} from '@material-ui/styles';
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import axios from 'axios';

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const useStyle = makeStyles(theme => ({
    filePicker: {
        width: '300px',

        '& .filepond--root': {
            fontSize: 'initial',
            transition: 'height ease .5s',
            margin: 0
        },

        '& .filepond--panel-root': {
            backgroundColor: 'white'
        }
    }
    // 'filepond--panel-root': {}
}));

function AttachmentMenu(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const [files, setFiles] = useState([]);
    const pond = useRef(null);
    const classes = useStyle();

    const server = {
        url: axios.defaults.baseURL,
        process: {
            url: '/api/card/attach',
            method: 'POST',
            headers: axios.defaults.headers,
            ondata: formData => {
                formData.append('id_card', props.cardId);
                return formData;
            },
            onload: response => props.onUpload(JSON.parse(response))
        }
    }

    function handleMenuOpen(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose()
    {
        setAnchorEl(null);
    }

    function handleUploadFinish(error)
    {
        if (!error) {
            setFiles([]);
            handleMenuClose();
        }
    }

    return (
        <div>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <Icon>attachment</Icon>
            </IconButton>
            {anchorEl && 
                <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
                    <div className={classes.filePicker}>
                        <FilePond
                            ref={pond}
                            files={files}
                            server={server}
                            instantUpload={false}
                            onprocessfile={handleUploadFinish}
                        />
                    </div>
                </ToolbarMenu>
            }
        </div>
    );
}

export default AttachmentMenu;
