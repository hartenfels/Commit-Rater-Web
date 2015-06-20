$script = <<SCRIPT
sudo apt-get update
sudo apt-get install -y carton perl-doc git openssl
git config --global user.name "vagrant"
git config --global user.email "vagrant@vagrant.vg"
cd /vagrant
make install
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision "shell", inline: $script
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  if Vagrant.has_plugin?("vagrant-cachier")
      config.cache.scope = :box
  end
end
