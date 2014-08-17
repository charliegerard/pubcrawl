# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  frist_name      :string(255)
#  last_name       :string(255)
#  username        :string(255)
#  email           :string(255)
#  password_digest :string(255)
#  avatar          :text
#  location        :string(255)
#  score           :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  has_secure_password
  has_many :followers, :dependent => :destroy
  has_many :friends, :through => :followers
  has_many :badges, :through => :pub_challenges
end