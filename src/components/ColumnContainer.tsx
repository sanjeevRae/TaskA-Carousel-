import { Column, Id, Task } from "../type";
import  TrashIcon  from "../icon/TrashIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import PlusIcon from "../icon/PlusIcon";

interface Props{
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    tasks: Task[];
    updateTask: (id: Id, content: string) => void;
    deleteTask: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {
    const { column,deleteColumn , updateColumn, createTask, tasks, deleteTask, updateTask} = props;
    const [editMode, setEditMode] = useState(false);

    const taskIds = useMemo(()=>{
        return tasks.map((task) => task.id);
    },[tasks]);


    const { setNodeRef, attributes, listeners, transform, transition , isDragging} 
    
    = useSortable({
        id: column.id,
        data:{
            type: "Column",
            column
        },
        disabled: editMode,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

  if (isDragging) {
    return (
        <div
    ref={setNodeRef}
    style={style}
    className="
    bg-[#212127]
    w-[300px]
    h-[500px]
    opacity-60
    max-h-[500px]
    rounded-md
    flex
    flex-col
    ">
        
    </div>
    );
    
  }


  return (

  < div
    ref={setNodeRef}
    style={style}
    className="
    bg-[#212127]
    w-[300px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
  > 

  {/* Column Title */}
    <div
        {...attributes}
        {...listeners}
        onClick={() => {setEditMode(true);}}
     className="
        bg-black
        text-md
        h-[60px]
        cursor-grab
        rounded-md
        rounded-b-none
        p-3
        font-bold
        border-[#212127]
        border-4
        flex
        items-center
        justify-between
        "
        >
        
        <div className="flex gap-2">
            <div
            className="
            flex
            justify-center
            items-center
            bg-mainBackgroundColor
            px-2
            py-1
            text-sm
            rounded-full
            "
             >
                
        </div>
            {!editMode && column.title}
            {editMode && (
                
                <input 
                className="bg-black focus :boder-rose-500 boder rounded outline-none px-2"
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus onBlur={()=>{
                    setEditMode(false);
                }}

            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    setEditMode(false);
                }
            }}
            />
        )}

        </div>
        <button
            onClick={() => {
                deleteColumn(column.id);
            }}
            className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-coloumnBackgroundColor
            rounded
            px-1
            py-2
            "
        >
            <TrashIcon />
        </button>
    </div>

            {/* Column Content */}
        <div className="
        flex flex-grow flex-col gap-4 p-2
        overflow-x-hidden
        overflow-y-auto">
            <SortableContext items={taskIds}>
            {tasks.map((task)=>(
                <TaskCard key={task.id} task={task} deleteTask={deleteTask}
                updateTask={updateTask} />
            )
        
        )}
        </SortableContext>
        </div>

        <button
        className="flex gap-2 item-center
        border-columnBackgroundColor border-2 rounded-md p-4
        border-[#212127]
        hover:bg-black hover:border-rose-900
        active:bg-black
        "
        
        onClick={() => {
            createTask(column.id);}
        }>
            <PlusIcon/>
        Add Task
        
    </button>
    </div>
  );
}



