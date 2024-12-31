---
title: Connect to WiFi from Linux command line
tags:
  - website, tutorials
---
### Preface
This method uses WPA_supplicant, for other methods involving iwctl and the alike, checkout [this article](https://wiki.archlinux.org/title/Network_configuration/Wireless#iw) on the Archwiki
### Objective
Configure and Connect to WiFi only using command line utilities.

### Requirements
\[Root access\] or \[access to sudo\]
wpa_supplicant,net-tools and dhclient(or DHCPCD) aldready installed on your computer.
wifi support on your laptop/pc

### additonal info
This guide will also go through some common problems while connecting to a WiFi. Look at the page-end if you face any issues
dhclient or DHCPCD are not required if you don't want to connect to the internet or if you want to assign the ip adress manually
wifi is not necessary since you can configure the software and connect later
you can also look up more resources and documents about the software used in this article from the sources listed below

### Conventions
+ \# requires given linux commands to be executed with root privileges either directly as a root user or by the use of sudo command
+ $ - given linux commands *can* be executed as a regular non-privileged user

-------

#### 1. Finding your wifi card name

First, you need to find the name of your physical wifi card. You can do that by typing 
    
    $ ip link
this will list out the connected network devices

in my case it's called "wlp0s20f3" because "lo" is loopback which is just an important placeholder card and eno1 is my ethernet port

and in your case, your wifi card probably starts with "w" as well, so just make sure which one is your wifi card.

(If for some reason you can't find your wifi card, try checking out the troubleshooting part before you continue)

#### 2. Turning on your wifi card

Now, you have to see if your wifi card is turned on by linux
You can check that by running "$ ifconfig" which will show your current active network devices.

If your card doesnt appear here, it means it is turned off.
To turn it on just type "# ifconfig \[your wifi card name\] up". you can check again by typing "$ ifconfig".

Now that the wifi card is turned on and ready to use. All you need to do now is just connect it to your wifi.

#### 3. Configuring wpa_supplicant

Now, you have to configure wpa_supplicant(the main program used to connect you to wifi).
First you need to make the configuration file, you can do that by touching it 
    
    # touch etc/wpa_supplicant/wpa_supplicant-wlp0s20f3.conf

you can replace wlp0s20f3 with your wifi card name.
now just edit the configuration file using a text editor like nano or vim(any text editor will do) 
    
    # nano etc/wpa_supplicant/wpa_supplicant-wlp0s20f3.conf

and add these two lines (all are small letters)

ctrl_interface=run/wpa_supplicant

update_config=1

and save and exit nano by pressing ctrl + O and then ctrl + X
#### 4. Adding your wifi credentials

To add your wifi name and password, just 
    
    # wpa_passphrase your_wifi_name your_wifi_password >> etc/wpa_supplicant/wpa_supplicant-wlp0s20f3.conf
if your wifi name has spaces in it, put them inside ""

you can check if the changes were made by editing the configuration file again.
If you made a mistake then delete the newly added lines and run the command again

#### 5. Connecting to wifi! Finally

you can connect to your wifi by running,

    wpa_supplicant -i [your wifi card name] -c etc/wpa_supplicant/wpa_supplicant-wlp6s0.conf

Now, you should be connected to your wifi!

also, you can use options like -B to make it run in the background

and option -qq to make it look more neat.

For more options, read the man page of wpa_supplicant ($ man wpa_supplicant)


#### 6. Connecting to the internet.

now Just type

    dhclient [your wifi card name]
note: you can use DHCPCD instead of dhclient

Sources:

[4-eyed-cat man's tutorial](https://youtu.be/QGyHDIYlLFA)

[wpa_supplicant manual](https://linux.die.net/man/8/wpa_supplicant)

-------

### Troubleshooting

ERROR: operation not permited, FIX: run it as root

ERROR: permission denied, FIX: run it as root

ERROR: wlan softblocked, FIX: try "# rfkill unblock wlan"

PROBLEM: Couldn't find my wifi card

SOLUTION:
You may not have the required wifi drivers installed on your system,
In arch and arch based linux distributions try downloading linux-firmware (# pacman -Sy linux-firmware).
In Debian/Ubuntu based distro's try downloading the firmware-iwlwifi and firmware-realtek package(might need to add some repo's)
or try downloading the intel wifi drivers for linux and extracting the .ucode to /lib/firmware.
In gentoo or any other linux distribution, try extracting the wifi drivers to /lib/firmware or compile the firmware into your kernel
In any case, a Reboot is highly recommended
