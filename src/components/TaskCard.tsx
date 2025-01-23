import { Id, Task } from "../type";
import TrashIcon from "../icon/TrashIcon";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

export default function TaskCard({task, deleteTask,updateTask}: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

     const { setNodeRef, attributes, listeners, transform, transition , isDragging} 
        
        = useSortable({
            id: task.id,
            data:{
                type: "Task",
                task
            },
            disabled: editMode,
        });


        const style = {
                transform: CSS.Transform.toString(transform),
                transition,
            };

    const toogleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    }

    if (isDragging) {
        return(
            <div 
            ref={setNodeRef}
            style={style}
            className="
            opacity-60
            bg-black
            p-2.5 h-[100px] min-h-[100px] 
            items-center
            cursor-grab relative "/>
        );
    }

if(editMode){
    return (
        <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-black p-2.5 h-[100px] min-h-[100px] 
        items-center flex text-left rounded-xl
        c hover:ring-2 hover:ring-rose-500 hover:ring-inset cursor-grab"
        >
    <textarea className="
    bg-black h-[90%] w-[full] resize-none
    text-white
    border-none rounded bg-transparent focus:outline-none
    p-2.5 min-h-[100px]items-center flex text-left rounded-xl
    courson-grab relative cursor-grab
    "
    value={task.content}
    autoFocus
    placeholder="Task content"
    onBlur={toogleEditMode}
    onKeyDown={(e)=> {
        if(e.key === "Enter" && e.shiftKey){toogleEditMode();} 
          }
        }
    onChange={(e) => updateTask(task.id, e.target.value)}
    ></textarea>
    </div> 
    );
    

}
  return (
    <div

            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toogleEditMode}
            className="bg-black p-2.5 h-[100px] min-h-[100px] 
            items-center flex text-left rounded-xl
            c hover:ring-2 hover:ring-rose-500 hover:ring-inset cursor-grab
             task"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            >
            <p
            className="my-auto h-[90%] w-[full] resize-none overflow-x-hidden
            whitespace-pre-wrap "
            >{task.content}
            </p>
            
            {mouseIsOver && (
        <button onClick={() => {
            deleteTask(task.id);
        }}
            className="stroke-white ml-auto p-2 opacity-60 hover:opacity-100" >
        <TrashIcon />
        </button>
        )}
    </div>
  );
}


