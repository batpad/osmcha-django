osmcha-django
==============================

.. image:: https://travis-ci.org/willemarcel/osmcha-django.svg
    :target: https://travis-ci.org/willemarcel/osmcha-django

.. image:: https://coveralls.io/repos/github/willemarcel/osmcha-django/badge.svg?branch=master
    :target: https://coveralls.io/github/willemarcel/osmcha-django?branch=master


A database and frontend to `OSMCHA<https://github.com/willemarcel/osmcha>`_. The aim of OSMCHA is to help find harmful
edits in the OpenStreetMap.


License: GPLv3

Settings
------------

osmcha-django relies extensively on environment settings which **will not work with
Apache/mod_wsgi setups**. It has been deployed successfully with both Gunicorn/Nginx
and even uWSGI/Nginx.

For configuration purposes, the following table maps the 'osmcha-django' environment
variables to their Django setting:


======================================= ================================= ========================================= ===========================================
Environment Variable                    Django Setting                    Development Default                       Production Default
======================================= ================================= ========================================= ===========================================
DJANGO_CACHES                           CACHES (default)                  locmem                                    redis
DJANGO_DEBUG                            DEBUG                             True                                      False
DJANGO_SECRET_KEY                       SECRET_KEY                        CHANGEME!!!                               raises error
DJANGO_SECURE_BROWSER_XSS_FILTER        SECURE_BROWSER_XSS_FILTER         n/a                                       True
DJANGO_SECURE_SSL_REDIRECT              SECURE_SSL_REDIRECT               n/a                                       True
DJANGO_SECURE_CONTENT_TYPE_NOSNIFF      SECURE_CONTENT_TYPE_NOSNIFF       n/a                                       True
DJANGO_SECURE_FRAME_DENY                SECURE_FRAME_DENY                 n/a                                       True
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS   HSTS_INCLUDE_SUBDOMAINS           n/a                                       True
DJANGO_SESSION_COOKIE_HTTPONLY          SESSION_COOKIE_HTTPONLY           n/a                                       True
DJANGO_SESSION_COOKIE_SECURE            SESSION_COOKIE_SECURE             n/a                                       False
DJANGO_DEFAULT_FROM_EMAIL               DEFAULT_FROM_EMAIL                n/a                                       "osmcha-django <noreply@example.com>"
DJANGO_SERVER_EMAIL                     SERVER_EMAIL                      n/a                                       "osmcha-django <noreply@example.com>"
DJANGO_EMAIL_SUBJECT_PREFIX             EMAIL_SUBJECT_PREFIX              n/a                                       "[osmcha-django] "
DJANGO_CHANGESETS_FILTER                CHANGESETS_FILTER                 None                                      None
POSTGRES_USER                           POSTGRES_USER                     None                                      None
POSTGRES_PASSWORD                       POSTGRES_PASSWORD                 None                                      None
PGHOST                                  PGHOST                            localhost                                 localhost
OAUTH_OSM_KEY                           SOCIAL_AUTH_OPENSTREETMAP_KEY     None                                      None
OAUTH_OSM_SECRET                        SOCIAL_AUTH_OPENSTREETMAP_SECRET  None                                      None
OSM_VIZ_TOOL_LINK                       VIZ_TOOL_LINK                     https://osmlab.github.io/changeset-map/#  https://osmlab.github.io/changeset-map/#
DJANGO_FEATURE_CREATION_KEYS            CREATION_KEYS                     []                                        None
======================================= ================================= ========================================= ===========================================


You can set each of these variables with:

    $ export VAR=VALUE

During the development, you can define the values inside your virtualenv ``bin/activate`` file.


Filtering Changesets
---------------------

You can filter the changesets that will be imported by defining the variable CHANGESETS_FILTER
with the path to a GeoJSON file containing a polygon with the geographical area you want to filter.


Getting up and running
----------------------

Basics
^^^^^^

The steps below will get you up and running with a local development environment.
We assume you have the following installed:

* pip
* virtualenv
* PostgreSQL

Before to install the python libraries, we need to install some packages in the
operational system::

    $ sudo ./install_os_dependencies.sh install

For the next step, make sure to create and activate a virtualenv_, then open a terminal at the project root and install the
requirements for local development::

    $ pip install -r requirements/local.txt

.. _virtualenv: http://docs.python-guide.org/en/latest/dev/virtualenvs/

Create a local PostgreSQL database::

    $ createdb osmcha

Run ``migrate`` on your new database::

    $ python manage.py migrate

You can now run the ``runserver_plus`` command::

    $ python manage.py runserver_plus

Open up your browser to http://127.0.0.1:8000/ to see the site running locally.

Setting Up Your Users
^^^^^^^^^^^^^^^^^^^^^

To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

To create an **superuser account**, use this command::

    $ python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

Deployment
------------

Check the `Deploy <DEPLOY.rst>`_ file for instructions on how to deploy with Heroku and Dokku.


Management Commands
--------------------

1. Export a CSV of all harmful changesets

    $ python manage.py generate_harmful_csv filename.csv

2. Mark a list of changesets as harmful or good, provided the first column in csv contains changeset ids

    - To mark changesets as bad

        $ python manage.py mark_harmful_changeset checking_username filename.csv True

    - To mark changesets as good

        $ python manage.py mark_harmful_changeset checking_username filename.csv ""