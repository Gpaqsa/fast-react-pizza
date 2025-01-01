import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../server/apiRestaurant";
import Menuitem from "./Menuitem";

function Menu() {

  const menu = useLoaderData();
  
  return (
    <div>
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
