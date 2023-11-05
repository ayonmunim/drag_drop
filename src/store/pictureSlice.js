import { createSlice } from "@reduxjs/toolkit";
import { cards } from "./dummytext";


const initialState = {
    cards : cards,
    board:[],
    selectedid:[]
}


export const pictureSlice = createSlice({
    name:'pictureSlice',
    initialState,
    reducers: {
        // Reducer to add an image to the board
        addImageToBoard:(state, action) => {
            // If the board is empty, do nothing
            if(state.board.length === 0) {
      
            } else {
                // Otherwise, add the first image from the board to the cards
                state.cards.unshift(state.board[0])
            }
            // Filter the cards to get the one with the id from the payload
              const plist = state.cards.filter((picture) => action.payload === picture.id )
              //Filter the cards to remove the one with the id from the payload
              const filteredData = state.cards.filter((card) => card.id !== plist[0].id)
            
              // Update the cards and board state
              state.cards = filteredData
              state.board = [plist[0]]  
        },
        // Reducer to move a card
        moveCard: (state, action) => {
            // Get the drag and hover indices from the payload
            const { dragIndex, hoverIndex } = action.payload;

            // Get the card that is being dragged
            const dragCard = state.cards[dragIndex];
             // Remove the card from its original position
            state.cards.splice(dragIndex, 1);
            // Insert the card at the new position
            state.cards.splice(hoverIndex, 0, dragCard);
          },
          
      // Reducer to set the selected id
        setSelectedId:(state, action) => {
            // Get the id and isChecked properties from the payload
            const {id, isChecked} = action.payload

        
    // If isChecked is true, add the id to the selectedid array
            if(isChecked) {
                state.selectedid.push(id)
            } else {
                // Otherwise, remove the id from the selectedid array
                state.selectedid = state.selectedid.filter((item) => item !== id )
            }
        },

         // Reducer to remove the selected id
        removeSelectedId: (state) => {
            // Filter the cards to remove the ones with ids in the selectedid array
            const result = state.cards.filter((item) => !state.selectedid.includes(item.id));

             // Update the cards and selectedid state
            state.cards = result
            state.selectedid = []
            
        },
          // Reducer to unselect all ids
        unselectAllId:(state) => {
            state.selectedid = []  
        }
    }

})

export default pictureSlice.reducer;

export const {addImageToBoard, moveCard, setSelectedId, removeSelectedId, unselectAllId} = pictureSlice.actions

