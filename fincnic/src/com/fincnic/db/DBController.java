package com.fincnic.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class DBController {

	private Connection conn;
	private String driver = "org.mariadb.jdbc.Driver";
	private String url = "jdbc:mariadb://localhost:3306/fincnic";;

	public DBController() throws SQLException, ClassNotFoundException {

		Class.forName(driver);
		conn = DriverManager.getConnection(url, "root", "");

		System.out.println("Connect success");

	}

	public boolean login(String userId, String password) throws SQLException {
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt
				.executeQuery("SELECT * FROM user WHERE user_id = " + userId + " AND user_password = " + password);
		if (rs.next()) {
			return true;
		} else {
			return false;
		}

	}

	public String getName(String userId) throws SQLException {
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT user_name FROM user WHERE user_id = " + userId);
		if (rs.next()) {
			return rs.getString("user_name");
		} else {
			return null;
		}
	}

	public JSONObject getAccounts(String userId) throws SQLException {

		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT * FROM account WHERE user_id = " + userId);

		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		while (rs.next()) {
			JSONObject object = new JSONObject();
			object.put("account_number", rs.getString("account_number"));
			jsonArray.add(object);
		}
		jsonObject.put("account_info", jsonArray);
		return jsonObject;

	}

	@SuppressWarnings("unchecked")
	public JSONObject getCreditor(String userId) throws SQLException {

		Statement stmt = conn.createStatement();
		ResultSet rs;

		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		rs = stmt.executeQuery("SELECT * FROM loans WHERE creditor_id = " + userId);
		while (rs.next()) {
			JSONObject object = new JSONObject();
			object.put("loans_id", rs.getString("loans_id"));
			object.put("creditor_id", userId);
			object.put("creditor_name", getName(userId));
			object.put("creditor_account_number", rs.getString("creditor_account_number"));
			String debtorId = "'" + rs.getString("debtor_id") + "'";
			object.put("debtor_id", debtorId);
			object.put("debtor_name", getName(debtorId));
			object.put("debtor_account_number", rs.getString("debtor_account_number"));
			object.put("total_money", rs.getInt("total_money"));
			object.put("balance_money", rs.getInt("balance_money"));
			object.put("init_date", rs.getString("init_date"));
			object.put("finish_date", rs.getString("finish_date"));
			jsonArray.add(object);
		}
		jsonObject.put("credit_info", jsonArray);
		return jsonObject;
	}

	@SuppressWarnings("unchecked")
	public JSONObject getDebtor(String userId) throws SQLException {
		Statement stmt = conn.createStatement();
		ResultSet rs;

		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		rs = stmt.executeQuery("SELECT * FROM loans WHERE debtor_id = " + userId);

		while (rs.next()) {
			JSONObject object = new JSONObject();
			object.put("loans_id", rs.getString("loans_id"));
			String creditorId = "'" + rs.getString("creditor_id") + "'";

			object.put("creditor_id", creditorId);
			object.put("creditor_name", getName(creditorId));
			object.put("creditor_account_number", rs.getString("creditor_account_number"));
			object.put("debtor_id", userId);
			object.put("debtor_name", getName(userId));
			object.put("debtor_account_number", rs.getString("debtor_account_number"));
			object.put("total_money", rs.getInt("total_money"));
			object.put("balance_money", rs.getInt("balance_money"));
			object.put("init_date", rs.getString("init_date"));
			object.put("finish_date", rs.getString("finish_date"));
			jsonArray.add(object);
		}
		jsonObject.put("debt_info", jsonArray);
		return jsonObject;

	}

	@SuppressWarnings("unchecked")
	public JSONObject getFriends(String userId) throws SQLException {
		Statement stmt = conn.createStatement();
		ResultSet rs;

		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		rs = stmt.executeQuery("SELECT * FROM friends WHERE my_id = " + userId);
		while (rs.next()) {
			JSONObject object = new JSONObject();
			String friendId = "'" + rs.getString("friend_id") + "'";
			object.put("id", friendId);
			object.put("name", getName(friendId));
			jsonArray.add(object);
		}
		jsonObject.put("friend_info", jsonArray);
		return jsonObject;
	}

	public void setPay(String loansId, int money) throws SQLException {
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT balance_money FROM loans WHERE loans_id = " + loansId);
		if (rs.next()) {

			int balanceMoney = rs.getInt("balance_money") + money;
			stmt.executeUpdate("UPDATE loans SET balance_money = " + balanceMoney + " WHERE loans_id = " + loansId);

		}
	}

	public void addFriend(String userId, String friendId) throws SQLException {
		Statement stmt = conn.createStatement();
		stmt.executeUpdate("INSERT INTO friends VALUES (" + userId + "," + friendId + ")");
	}

	public void addAccount(String userId, String accountNumber) throws SQLException {
		Statement stmt = conn.createStatement();
		stmt.executeUpdate("INSERT INTO account VALUES (" + userId + "," + accountNumber + ")");
	}
	public void removeLoan(String loansId) throws SQLException{
		Statement stmt = conn.createStatement();
		stmt.executeUpdate("DELETE FROM loans WHERE loans_id = "+loansId);
	}
	public void finish() throws SQLException {
		this.conn.close();
	}
}
