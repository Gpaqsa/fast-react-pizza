import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../server/apiRestaurant";
import MenuItem from "./MenuItem";
import Reciept from "../windowPopUp/Reciept";
import { useState } from "react";


function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const menu = useLoaderData(); 

  const onOpenWindow = () =>{
    setIsOpen(!isOpen)
    console.log('Update')
  }

  const onCloseWindow = () => {
    setIsOpen(false)
  }
  return (
    <>
      <ul className="divide-y divide-stone-200 px-2 cursor-pointer" >
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
      {isOpen && <Reciept onCloseWindow={onCloseWindow} />}
      
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return  menu ;
}

export default Menu;
