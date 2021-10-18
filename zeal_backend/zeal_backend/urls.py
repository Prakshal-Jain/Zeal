"""zeal_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from django.views.generic.base import TemplateView
from zeal_backend.settings import db_config
from django.conf import Settings
from django.conf.urls.static import static
from django import views
from django.conf import settings
import psycopg2

def test(request):
    print('testing database...')
    conn = psycopg2.connect(db_config)
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS test (id serial PRIMARY KEY, num integer, data varchar);")
    cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)", (100, "Hello, world!"))

    cur.execute('SELECT * FROM test;')

    sample = cur.fetchall()

    cur.close()
    conn.close()

    return HttpResponse(sample)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('users.urls')),
    path('test/', test),
    path('', TemplateView.as_view(template_name='index.html')),
    # path('upload/', views.UploadImage)
]


urlpatterns += static(settings.MEDIA_URL,
                        document_root=settings.MEDIA_ROOT)