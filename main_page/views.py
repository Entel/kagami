import random
import json
import urllib
import json
import socket
import gzip
import re, requests
from io import BytesIO
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def weather(request):
    if request.method == 'POST':
        #get local ipaddress
        ip, addr = query_ip_address()
        #get weather
        location = [addr['lat'], addr['lon']]
        weather_res = query_weather(location)
        #print(weather_res['now'])
        
        json_res = {
            "ip": ip,
            "locate": addr['city'],
            "lat": addr['lat'],
            "lon": addr['lon'],
            "temp": weather_res['now']['temp'],
            "feelsLike": weather_res['now']['feelsLike'],
            "icon": weather_res['now']['icon'],
            "text": weather_res['now']['text'],
            "windDir": weather_res['now']['windDir'],
            "windScale": weather_res['now']['windScale'],
            "humidity": weather_res['now']['humidity']
        }

        return HttpResponse(json.dumps(json_res))

def query_ip_address():
    #get ip
    #runable in company's network
    url = 'http://txt.go.sohu.com/ip/soip'
    #print(url)
    response = requests.get(url)
    text = response.text
    ipaddr = re.findall(r'\d+.\d+.\d+.\d+', text)[0]
    #print(ipaddr)
    '''
    try: 
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ipaddr = s.getsockname()[0]
    finally:
        s.close()
    print(ipaddr)
    '''

    #get address
    url = 'http://ip-api.com/json/%s' % (ipaddr)
    #print(url)
    urlobject = urllib.request.urlopen(url)
    urlcontent = urlobject.read()
    res = json.loads(urlcontent)
    #print(res)

    return ipaddr, res

key = '8f096661c754438ebd7379b040c5d113'
def query_weather(location):
    location_latlng = str(location[1]) + ',' +str(location[0])
    #get city, for consule
    url = 'https://geoapi.qweather.com/v2/city/lookup?location={}&key={}&lang=en'.format(location_latlng, key)
    #print(url)
    urlobject = urllib.request.urlopen(url)
    urlcontent = urlobject.read()
    buff = BytesIO(urlcontent)
    f = gzip.GzipFile(fileobj=buff)
    res = f.read().decode('utf-8')
    #print(res)

    #get weather
    url = 'https://devapi.qweather.com/v7/weather/now?location={}&key={}&lang=en'.format(location_latlng, key)
    #print(url)
    urlobject = urllib.request.urlopen(url)
    urlcontent = urlobject.read()
    buff = BytesIO(urlcontent)
    f = gzip.GzipFile(fileobj=buff)
    res = f.read().decode('utf-8')
    res = json.loads(res)
    #print(res)

    return res


