import { useCallback, useRef } from 'react';
import { Card } from './Card.js';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import Picture from './picture.js';
import { useDispatch, useSelector } from 'react-redux';
import { addImageToBoard, removeSelectedId, unselectAllId } from '../store/pictureSlice.js';

// GalleryHeader component displays the number of selected items and a delete button
const GalleryHeader = ({ selectedid, removeSelectedId }) => {

  const dispatch = useDispatch()

  return (
    <div className='w-full bg-red-100 p-4'>
      {selectedid.length !== 0 ? (
        <div className='flex justify-between'>
          <div className='flex justify-between items-center'>
            <input onChange={() => dispatch(unselectAllId())} type="checkbox" defaultChecked />
            <p className='text-md'>{selectedid.length} Items Selected</p>
          </div>
          <button onClick={removeSelectedId} className='bg-purple-800 p-1 rounded text-white'>Delete file</button>
        </div>
      ) : (
        <div>Gallery</div>
      )}
    </div>
  );
};

// Board component displays the images on the board
const Board = ({ board, drop }) => {
  const {cards} = useSelector((state) => state.pictureItem)

  

  return (
    <div className='col-span-12 sm:col-span-6 md:col-span lg:col-span-4 row-span-2 board relative left-0 right-0 border-2 border-gray float-left rounded' ref={drop}>
      {/* {board && board.map((picture) => picture && <Picture url={picture.url} id={picture.id} />)} */}
      {board.length === 0 ? <Picture url={cards[0].url} id={cards[0].id} />: board.map((picture) => picture && <Picture url={picture.url} id={picture.id} />) }
    </div>
  );
};

// Container component is the main component that includes GalleryHeader, Board and the image upload section
export const Container = () => {
  const dispatch = useDispatch();
  const { cards, board, selectedid } = useSelector((state) => state.pictureItem);

  // renderCard function is used to render each card
  const renderCard = useCallback((card, index) => (
    <Card
      key={card.id}
      index={index}
      id={card.id}
      text={card.text}
      url={card.url}
    />
  ), []);

  const fileInput = useRef(null);

  const handleImageClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    // handle the file change here
    console.log(event.target.files[0]);
  };

  // useDrop is a hook from react-dnd library used for the drag and drop functionality
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => dispatch(addImageToBoard(item.id)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver
    })
  });

  return (
    <main className='flex flex-col items-center border-4 w-[80%] h-full mx-auto '>
      <GalleryHeader selectedid={selectedid} removeSelectedId={() => dispatch(removeSelectedId())} />
      <div className='p-4 grid grid-cols-10 gap-2 justify-center '>
        <Board board={board} drop={drop} />
        {cards.map(renderCard)}
        <div className='flex flex-col items-center justify-center h-[240px]  grid-row-1 col-span-6 sm:col-span-3 lg:col-span-2 bg-orange-300'>
      <p>Upload Image</p>
      <img 
        className='w-10 h-10 object-cover cursor-pointer'
        src={'https://imagizer.imageshack.com/img922/8485/fJzhwG.png'} 
        alt='draggable'
        onClick={handleImageClick}
      />
      <input 
        type='file' 
        ref={fileInput} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
      />
    </div>
      </div>
    </main>
  );
};