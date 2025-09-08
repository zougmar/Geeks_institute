CREATE TABLE tickets (
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  attendee_id INTEGER REFERENCES attendees(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (event_id, attendee_id)
);