import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../server/apiRestaurant";
import Menuitem from "./Menuitem";

function Menu() {

  const menu = useLoaderData();
  
  return (
    <div className="m-16 grid grid-cols-3 gap-4">
      <ul>
        {menu.map((pizza) => (
          <Menuitem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return  menu ;
}

export default Menu;
