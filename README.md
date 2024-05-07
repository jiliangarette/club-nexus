LARACULT-REACT NOTES

BROADCASTING:

-   Is a real-time communication
-   Is a method whenever our client is connected to the server through the socket server and receives that real-time updates regarding certain things.

Laravel reverb: is a separate server using different port. that handles the response?. idk but sounds like it. It then connect to a user using web suck it.

example:
user 1 want to communicate with the user 2.

so by option it can be done by a server that connects to database, a user post that message and get the messege from the database to be sent to user 2.
But this is not realtime it needs state to be triggered before it can be display.

Eeverb can make it better and can be simplified this by using the Laravel reverb heres what i think it do:
user 1 sends the message to the server and puts it in the database and then while sending the message to the database the Laravel server also tells the Laravel reverb which is a separate server/port and takes this messege and sent it to user 2 which allows the communication in real time.

--bash cmd
#laravel new NAME-OF-PROJECT

    --database configuration
    #change the sqlite to 'mysql' dependi sa db imo gamit lods
    #change the `DB NAME` in {.env} to name of the repo
    #php artisan migrate

    --to run this shit

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

##Ports commands

Run Laravel reverb:

    #php artisan reverb:start --debug

Run Laravel:

    #php artisan serve

Run React:

    #npm run dev
