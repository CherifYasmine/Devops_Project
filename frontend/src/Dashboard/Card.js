
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import {BsFillPeopleFill} from 'react-icons/bs';
import {RiLoader2Fill} from 'react-icons/ri'
import { Button } from '@mui/material';
import { deleteCard, updateCard } from '../apiCalls';
function Card ({card}) {
    const [name, setName] = useState(card.name)
    const [description, setDescription] = useState(card.description)
    const saveChanges = async () => {
        await updateCard({cardId: card._id, name: name, description: description}).then((response)=>window.location.reload())
    }
    const dropCard = async () => {
        await deleteCard(card._id).then((response)=>window.location.reload())
    }
 return(
    <div>
        <Box sx={styles.box}>
            <input style={styles.title} name='name' value={name} onChange={(e)=>setName(e.target.value)} />
            <hr />
            <div style={styles.infos}>
                <BsFillPeopleFill color='grey'/>
                <span style={styles.assignTitle}>Assign</span>
                <span style={styles.assignee}>{card.assignee}</span>
            </div>
            <div style={styles.infos}>
                <RiLoader2Fill color='grey'/>
                <span style={styles.assignTitle}>Status</span>
                <span style={styles.assignee}>{card.status}</span>
            </div>
            <input style={styles.desc} placeholder='Add a description...' name='description' value={description} onChange={(e)=>setDescription(e.target.value)} />
            

            <Button style={styles.saveBtn} variant="contained" onClick={saveChanges} >Save Changes</Button>
            <Button style={styles.deleteBtn} variant="outlined" onClick={dropCard} >Delete Card</Button>
        </Box>
    </div>
 )
}
const styles = {
    box: {

        height: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    title: {
        marginTop: 30,
        border: 'none',
        fontSize: 30,
        fontWeight: 'bold'
    },
    desc: {
        marginTop: 20,
        border: 'none',
        fontSize: 15,
        color: 'grey',
        height: 50,
        width: 400
    },
    saveBtn: {
        marginTop : '100%',
        marginLeft: '45%',
        display: 'block',
        width: 180
    },
    deleteBtn: {
        marginTop: '-16%',
        width: 150,
        marginRight: 30
    },
    infos: {
        marginTop:30
    },
    assignTitle:{
        color: 'grey',
        marginLeft: 15,
    },
    assignee:{
        color: 'grey',
        marginLeft: 30,
    }
}
export default Card;