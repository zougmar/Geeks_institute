from flask import Blueprint, render_template, request, redirect, url_for, flash

from models.your_model import Event, Organizer, Attendee

main = Blueprint('main', __name__)

@main.route('/events')
def events():
    page = request.args.get('page', 1, type=int)
    q = request.args.get('q', '', type=str)
    query = Event.query
    if q:
        query = query.filter(Event.name.ilike(f'%{q}%'))
    pagination = query.order_by(Event.date.desc()).paginate(page=page, per_page=6, error_out=False)
    return render_template('events/index.html', events=pagination.items, pagination=pagination, q=q)

@main.route('/events/<int:id>')
def event_details(id):
    event = Event.query.get_or_404(id)
    return render_template('events/details.html', event=event)

@main.route('/events/create', methods=['GET','POST'])
def create_event():
    if request.method == 'POST':
        # validate fields
        name = request.form.get('name')
        date = request.form.get('date')  # parse to datetime
        organizer_id = request.form.get('organizer_id', type=int)
        # perform validation; if error: flash and re-render
        ev = Event(name=name, date=date, location=request.form.get('location'), description=request.form.get('description'), organizer_id=organizer_id)
        db.session.add(ev); db.session.commit()
        flash('Event created', 'success')
        return redirect(url_for('main.events'))
    organizers = Organizer.query.all()
    return render_template('events/create.html', organizers=organizers)
