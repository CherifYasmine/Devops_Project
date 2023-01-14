import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteColumn, getColumn, updateColumn } from '../apiCalls';
import CardCol from './CardCol'
import CardCreate from './CardCreate';
// const colors = ['#a48ce4', '#b6d7a8', '#8cace4', '#e48c8c', '#f7df7c' ]

function KanbanColumn({ columnId, index }) {

    const [column, setColumn] = useState({})
    const [columnName, setColumnName] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getColumn(columnId).then(function (response) {
            setColumn(response.data)
            setColumnName(response.data.name)
        });

    }, [columnId])

    const updateColumnName = async (e) => {
        setColumnName(e.target.value)
        await updateColumn({ columnId: columnId, name: e.target.value }).then((response) => {
            console.log(response)
        })
    }
    const dropColumn = async () =>{
        await deleteColumn(columnId).then((response)=>console.log(response))
    }
    return (
        <div style={styles.container}>
            <div style={{margin: 20}}>
            <div style={styles.columnName}>
            <input
                style={styles.inputName}
                type="text"
                name="name"
                value={columnName}
                onChange={updateColumnName}
            />
            <IconButton style={styles.deleteIcon} onClick={dropColumn} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            </div>
            {
                column?.cards?.map((card) => {
                    if(!card || card!==null) {
                        return(
                            <div key={card}><CardCol cardId={card} /></div>
                        )
                    }
                    return null
                }
                )
            }
            <Button onClick={handleOpen} style={styles.newBtn}> + New </Button>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{        width: 500, }}
                >
                    <CardCreate columnId={columnId} />
                </Modal>
            </div>
        </div>
    );
}

const styles = {
    container:{
        borderColor: '#D3D3D3',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: '10%'
    },
    columnName:{
        marginBottom: 20,
        display: 'flex',
    },
    inputName: {
        border: 'none',
        fontSize: 18,
        // marginLeft: -50
    },
    newBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: 17,
        display: 'block',
        color: 'grey',
        marginTop: 10,

    },
    deleteIcon:{
        color: 'black',
        marginTop: -10
    },
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(90%, -50%)',
        width: 400,
        height: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
}
export default KanbanColumn;
