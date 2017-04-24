# v 2.0.3
# Depends on config.yaml
# -*- mode: ruby -*-

dir = File.dirname(File.expand_path(__FILE__))
require 'yaml'
configValues = YAML.load_file("#{dir}/config.yaml")

data = configValues['vagrantfile']
Vagrant.require_version '>= 1.8.1'

Vagrant.configure('2') do |config|
    config.vm.box = "scotch/box"
    config.vm.synced_folder ".", "/var/www", type: "nfs"

    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.manage_guest = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline = true

    config.vm.define data['boxname'] do |node|
        node.vm.hostname = data['hostname']
        node.vm.network :private_network, ip: data['ip']
        node.hostmanager.aliases = data['aliases']
    end

    config.vm.provision "shell", inline: <<-SHELL
        # apt update
        sudo add-apt-repository -y ppa:ondrej/php
        sudo apt-get update

        ###############################################################################
        ### REMOVE THE COMMENTS FOR THE NEEDED PHP VERSION IN THE FOLLOWING SECTION ###
        ###############################################################################

        ### PHP 5.6 ###
        # sudo sed -i 's/.*always_populate_raw_post_data.*/always_populate_raw_post_data = -1/' /etc/php5/apache2/php.ini
        # sudo sed -i 's/.*max_execution_time.*/max_execution_time = 240/' /etc/php5/apache2/php.ini
        # sudo sed -i 's/.*max_input_vars.*/max_input_vars = 1500/' /etc/php5/apache2/php.ini
        # sudo sed -i 's/.*display_errors.*/display_errors = On/' /etc/php5/apache2/php.ini
        # sudo sed -i 's/.*error_reporting.*/error_reporting = E_ALL/' /etc/php5/apache2/php.ini
        # sudo sed -i 's/.*error_log.*/error_log = \/var\/www\/web\/php-error.log/' /etc/php5/apache2/php.ini

        ### PHP 7.0 ###
        sudo apt-get install -y php7.0
        sudo apt-get install -y php7.0-mysql libapache2-mod-php7.0 php7.0-gd php7.0-mysqli php7.0-soap php7.0-xml php7.0-zip php7.0-mbstring php7.0-curl
        sudo a2dismod php5
        sudo a2enmod php7.0
        sudo apachectl restart
        sudo sed -i 's/.*always_populate_raw_post_data.*/always_populate_raw_post_data = -1/' /etc/php/7.0/apache2/php.ini
        sudo sed -i 's/.*max_execution_time.*/max_execution_time = 240/' /etc/php/7.0/apache2/php.ini
        sudo sed -i 's/.*max_input_vars.*/max_input_vars = 1500/' /etc/php/7.0/apache2/php.ini
        sudo sed -i 's/.*display_errors.*/display_errors = On/' /etc/php/7.0/apache2/php.ini
        sudo sed -i 's/.*error_reporting.*/error_reporting = E_ALL/' /etc/php/7.0/apache2/php.ini
        sudo sed -i 's/.*error_log.*/error_log = \/var\/www\/web\/php-error.log/' /etc/php/7.0/apache2/php.ini

        ### PHP 7.1 ###
        # sudo apt-get install -y php7.1
        # sudo apt-get install -y php7.1-mysql libapache2-mod-php7.1 php7.1-gd php7.1-mysqli php7.1-soap php7.1-xml php7.1-zip php7.1-mbstring php7.1-curl
        # sudo a2dismod php5
        # sudo a2enmod php7.1
        # sudo apachectl restart
        # sudo sed -i 's/.*always_populate_raw_post_data.*/always_populate_raw_post_data = -1/' /etc/php/7.1/apache2/php.ini
        # sudo sed -i 's/.*max_execution_time.*/max_execution_time = 240/' /etc/php/7.1/apache2/php.ini
        # sudo sed -i 's/.*max_input_vars.*/max_input_vars = 1500/' /etc/php/7.1/apache2/php.ini
        # sudo sed -i 's/.*display_errors.*/display_errors = On/' /etc/php/7.1/apache2/php.ini
        # sudo sed -i 's/.*error_reporting.*/error_reporting = E_ALL/' /etc/php/7.1/apache2/php.ini
        # sudo sed -i 's/.*error_log.*/error_log = \/var\/www\/web\/php-error.log/' /etc/php/7.1/apache2/php.ini

        # SSL if needed
        sudo a2enmod ssl
        sudo sed -i -e '\$a<VirtualHost *:443>' /etc/apache2/sites-available/000-default.conf
        sudo sed -i -e '\$aSSLEngine on' /etc/apache2/sites-available/000-default.conf
        sudo sed -i -e '\$aSSLCertificateFile /etc/ssl/certs/dummy.crt' /etc/apache2/sites-available/000-default.conf
        sudo sed -i -e '\$aSSLCertificateKeyFile /etc/ssl/private/dummy.key' /etc/apache2/sites-available/000-default.conf
        sudo sed -i -e '\$aDocumentRoot /var/www/web' /etc/apache2/sites-available/000-default.conf
        sudo sed -i -e '\$a</VirtualHost>' /etc/apache2/sites-available/000-default.conf
        sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/dummy.key -out /etc/ssl/certs/dummy.crt -subj "/C=CH/ST=Schweiz/L=Bern/O=dummy/OU=IT Department/CN=dummy"

        #Change web root + add context
        sudo sed -i s,/var/www/public,/var/www/web,g /etc/apache2/sites-available/000-default.conf
        sudo sed -i s,/var/www/public,/var/www/web,g /etc/apache2/sites-available/scotchbox.local.conf

        # Restart Apache
        sudo service apache2 restart

    SHELL
    # Mailcatcher
    config.vm.provision "shell", inline: "/home/vagrant/.rbenv/shims/mailcatcher --http-ip=0.0.0.0", run: "always"
end