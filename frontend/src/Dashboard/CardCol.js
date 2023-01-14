import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { getCard } from '../apiCalls';
import Card from './Card';

function CardCol({ cardId }) {
    const [card, setCard] = useState({})
    const [open, setOpen] = React.useState(false);
    const [showDesc, setShowDesc] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getCard(cardId).then(function (response) {
            setCard(response.data)
        });

    }, [cardId])

    if (card !== null) {
        return (
            <div>
                <Button onClick={handleOpen} style={styles.cardBtn} variant="outlined">
                    {card?.name}                    
                </Button>
                {
                        showDesc ?
                        <button style={styles.note} onClick={()=>setShowDesc(!showDesc)}>{card.description}</button>
                        :
                        <button style={styles.note} onClick={()=>setShowDesc(true)}>Show note</button>
                    }
                <Modal
                    sx={{width: 500,}}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card card={card} />
                </Modal>
            </div>
        );
    }
}
const styles = {
    cardBtn: {
        backgroundColor: 'transparent',
        fontSize: 17,
        marginTop: 10,
        // marginLeft: -170,
        width: '100%',
        minHeight: 40,
        color: 'black',
        borderColor: 'black'
    },
    deleteIcon: {
        color: 'black',
        marginLeft: 70
    },
    note: {
        color: 'grey',
        fontSize: 12,
        backgroundColor: 'transparent',
        border: 'none'
    }
}
export default CardCol;
