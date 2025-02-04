import { useFetcher } from "react-router"
import Button from "../../ui/Button"
import { updateOrder } from "../../server/apiRestaurant";
const UpdateOrder = ({ order }) => {
    const fetcher = useFetcher();

    return (
      <fetcher.Form method="PATCH" className="text-right ">    
        <Button type="primary" >Make priority</Button>
      </fetcher.Form>
  )
}

export default UpdateOrder


export async function action({ request, params }) {
    console.log(params)
    const data = { priority: true }
    await updateOrder(params.orderId, data)
    return null
} 