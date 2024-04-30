LARAVEL-REACT NOTES

BROADCASTING: 
	#is a real-time communication
	#is a method whenever our client is connected to the server through the socket server and receives that real-time updates regarding certain things.

	laravel reverb: is a separate server using different port. that handles the response?. idk men but sounds like it. but it connect through a user using websocket, this nuts.

example:
user 1 want to communicate with the user 2. 

so basically it has a server that connects to database, a user post that message and get the messege from the database to be sent to user 2?
No. it can be somehow simplified by using the Laravel reverb heres the tea:
user 1 sends the message to the server and puts it in the database and then while sending  the message to the  database the Laravel server also tells the Laravel reverb which is a separate server and takes this messege and sent it to user 2 which allows the communication in real time. 












LARAVEL-REACT NOTES

laracult:
	
	--bash cmd
	#laravel new NAME-OF-PROJECT

	--database configuration
	#change the sqlite to 'mysql' dependi sa db imo gamit lods
	#change the `DB NAME` in {.env} to name of the repo
	#php artisan migrate

	--to run this shit
	#php artisan serve

	--extension dependency
	#composer requires Laravel:breeze --dev
	#php artisan breeze:install
		>react
		>dark
		>pest
  
 ##Other Third party libs:

	#npm install @headlessui/react @heroicons/react daisyui emoji-picker-react react-markdown uuid

Broadcasting:

	#php artisan install:broadcasting
		>yes
		>yes

How does one make a model:

	#php artisan make:model Group -m
	#php artisan make:model User -m

		--this means that make a database table User and -m is migrating it.



	