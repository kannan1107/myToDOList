import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { GripVertical } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';



const DragDrop = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <GripVertical {...listeners} size={15} />
      {children}
    </div>
  );
};

export default DragDrop;
