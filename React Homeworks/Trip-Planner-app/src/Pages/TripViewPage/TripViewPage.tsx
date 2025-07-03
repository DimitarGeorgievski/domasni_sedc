import { TripCard } from "../../Components/TripCard/TripCard"
import { loadPlannerFromLocalStorage } from "../../services/data.service"
import "./TripViewPage.css"

export function TripViewPage() {
    const trips = loadPlannerFromLocalStorage()
    return <>
        <h1 className="trips-header">Your Trips:</h1>
    <div className="wrapper-cards">
        {trips.map(trip => <TripCard key={trip.name} trip={trip}/>)}
    </div>
    </>
}