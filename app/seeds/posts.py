from app.models import db, Post, environment, SCHEMA


def seed_posts():
    demo_post_1 = Post(
        user_id = 1, body = 'This is my first post.')
    demo_post_2 = Post(
        user_id = 1, body = "I love this app so far!")
    marnie_post_1 = Post(
        user_id = 2, body = "Let's go team!")

    db.session.add(demo_post_1)
    db.session.add(demo_post_2)
    db.session.add(marnie_post_1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the posts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        
    db.session.commit()