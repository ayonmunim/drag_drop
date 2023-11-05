// Import necessary hooks and components
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import Picture from './picture.js';
import { useDispatch, useSelector } from 'react-redux';
import { moveCard, setSelectedId } from '../store/pictureSlice.js';


// Card component
export const Card = ({ id, url, text, index }) => {
  // Use ref to access the DOM element
  const ref = useRef(null);
  // Use dispatch to dispatch actions
  const dispatch = useDispatch();
  // Use state to handle hover state
  const [isHovered, setIsHovered] = useState(false);
  // Use selector to access the state in the store
  const { selectedid } = useSelector((state) => state.pictureItem);

  // Function to handle hover logic
  const handleHover = (item, monitor) => {
    // If the ref is not attached to an element, return
    if (!ref.current) {
      return;
    }
    // Get the index of the dragged item and the hovered item
    const dragIndex = item.index;
    const hoverIndex = index;
    // If the dragged item is the same as the hovered item, return
    if (dragIndex === hoverIndex) {
      return;
    }
    // Get the middle Y coordinate of the hovered item
    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Get the Y coordinate of the pointer relative to the hovered item
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // If the dragged item is above the hovered item and the pointer is above the middle of the hovered item, return
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    // If the dragged item is below the hovered item and the pointer is below the middle of the hovered item, return
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // Dispatch the moveCard action to move the dragged item to the place of the hovered item
    dispatch(moveCard({ dragIndex, hoverIndex }));
    // Update the index of the dragged item
    item.index = hoverIndex;
  };

  // Use drop to handle drop events
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: handleHover,
  });

  // Use drag to handle drag events
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Connect drag and drop to the DOM element
  drag(drop(ref));

  // Function to handle checkbox change events
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    // Dispatch the setSelectedId action to update the selected id in the store
    dispatch(setSelectedId({ isChecked, id }));
  };

  // Check if the id of the card is in the selected id array
  const checkedTrue = selectedid.includes(id);



  // Render the card
  return (
    <div
      className={` col-span-6 sm:col-span-3  lg:col-span-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
      style={{
        border: '1px solid grey',
        cursor: 'pointer',
        height: 'full',
        position: 'relative',
        borderRadius:'12px',
        opacity: isDragging ? 2 : 1
      }}
      data-handler-id={handlerId}
    >


  {isHovered || checkedTrue ? (
  <div className={`absolute rounded-xl  ${checkedTrue ?  'bg-[#F3F5F4]' :'bg-[#777777]' } w-full h-full p-4 opacity-80`}>
    <input
      type='checkbox'
      name='delete'
      checked={checkedTrue}
      onChange={handleCheckboxChange}
    />
  </div>
) : null}
      <Picture url={url} />
  </div>
  );
};
