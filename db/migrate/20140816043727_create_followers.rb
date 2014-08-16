class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
      t.integer :user_id
      t.integer :friend_id
      t.timestamp
    end
  end
end
