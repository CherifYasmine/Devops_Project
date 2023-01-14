
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import {BsFillPeopleFill} from 'react-icons/bs';
import {RiLoader2Fill} from 'react-icons/ri'
import { Button } from '@mui/material';
import { addCard } from '../apiCalls';
function CardCreate ({columnId}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const saveChanges = async () => {
        await addCard({name: name, description: description, columnId:columnId, assignee: 'Yasmine Cherif'})
        .then((response)=>window.location.reload())
        .catch(err=>console.error(err))
    }
 return(
    <div>
        <Box sx={styles.box}>
            <input style={styles.title} placeholder='Add a name...' name='name' value={name} onChange={(e)=>setName(e.target.value)} />
            <hr />
            <div style={styles.infos}>
                <BsFillPeopleFill color='grey'/>
                <span style={styles.assignTitle}>Assign</span>
                <span style={styles.assignee}>Empty</span>
            </div>
            <div style={styles.infos}>
                <RiLoader2Fill color='grey'/>
                <span style={styles.assignTitle}>Status</span>
                <span style={styles.assignee}>Not Started</span>
            </div>
            <input style={styles.desc} placeholder='Add a description...' name='description' value={description} onChange={(e)=>setDescription(e.target.value)} />
            

            <Button style={styles.saveBtn} variant="contained" onClick={saveChanges} >Save Changes</Button>
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
        marginLeft: '20%',
        display: 'block',
        width: 200
    },
    deleteBtn: {
        marginTop: '-16%',
        marginLeft: 12,
        width: 180
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
export default CardCreate;