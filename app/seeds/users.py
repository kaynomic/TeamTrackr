from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image='https://media.istockphoto.com/id/1328399434/photo/live-demo-symbol-concept-words-live-demo-on-wooden-blocks-on-a-beautiful-orange-background.jpg?b=1&s=170667a&w=0&k=20&c=ZRKfqDddLSSK9sE5OXoGCUgf9FnIRUBaOlmjDpcohFk=')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', image='https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhaW50aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', image='https://media.istockphoto.com/id/1350342662/photo/chubs-portrait.jpg?b=1&s=170667a&w=0&k=20&c=x0HGgM9s0TL6zvGosgYL7XOQBSMOsYtXwQYVFahoRfM=')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()