import type { AddTripPlanReq } from "../../models/TripPlan.model"
import "./TripCard.css"

interface TripCardProps{
    trip: AddTripPlanReq;
}

export function TripCard({trip}: TripCardProps) {
    return <div className="trip-card">
      <div className="passenger-name">
        <h2>{trip.name}</h2>
        <span className="trip-budget">${trip.budget}</span>
      </div>
      <div className="trip-info">
        <p><strong>Email:</strong> {trip.email}</p>
        <p><strong>Passport:</strong> {trip.passport}</p>
        <p><strong>Comments:</strong> {trip.comments}</p>
      </div>
      <div className="trip-countries">
        <h2>Countries:</h2>
        <ol>
          {trip.countries.map((c, id) => (
            <li key={id}>
              {c.name} — {c.days} days
            </li>
          ))}
        </ol>
      </div>
    </div>
}