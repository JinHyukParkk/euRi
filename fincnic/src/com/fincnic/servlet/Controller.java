package com.fincnic.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.fincnic.db.DBController;

/**
 * Servlet implementation class Controller
 */
@WebServlet("/Controller")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;
	DBController dc;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Controller() {
		super();
		try {
			dc = new DBController();
		} catch (SQLException sqlEx) {
			sqlEx.printStackTrace();
		} catch (ClassNotFoundException cnfEx) {
			cnfEx.printStackTrace();
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		int what = Integer.parseInt(request.getParameter("what"));
		try {
			// login
			if (what == 0) {
				response.setContentType("text/plain");
				PrintWriter pw = response.getWriter();
				String id = "'" + request.getParameter("id") + "'";
				String password = "'" + request.getParameter("pwd") + "'";
				System.out.println(id);
				System.out.println(password);
				if (dc.login(id, password)) {
					pw.print("1");
				} else {
					pw.print("0");
				}
				pw.close();
			// 대출 현황
			} else if (what == 1) {
				response.setContentType("text/plain; charset=UTF-8");
				PrintWriter pw = response.getWriter();
				String userId = request.getParameter("id");
				userId = "'" + userId + "'";
				
				System.out.println(userId);
				
				JSONObject jsonObject = new JSONObject();
				JSONArray jsonArray = new JSONArray();
				
				JSONObject creditor = dc.getCreditor(userId);
				JSONObject debtor = dc.getDebtor(userId);
				
				jsonArray.add(creditor);
				jsonArray.add(debtor);
				
				jsonObject.put("info", jsonArray);
				System.out.println(jsonObject.toJSONString());
				pw.print(jsonObject.toJSONString());

				pw.close();
			//해당 계정의 친구 목록   
			} else if (what == 2) {
				response.setContentType("text/plain; charset=UTF-8");
				PrintWriter pw = response.getWriter();

				String userId = request.getParameter("id");
				userId = "'" + userId + "'";
				JSONObject friends = dc.getFriends(userId);

				pw.println(friends.toJSONString());
				pw.close();
			//해당 계정의 계좌 목록  
			} else if (what == 3) {
				response.setContentType("text/plain; charset=UTF-8");
				PrintWriter pw = response.getWriter();

				String userId = request.getParameter("id");
				userId = "'" + userId + "'";
				JSONObject accounts = dc.getAccounts(userId);

				pw.println(accounts.toJSONString());
				pw.close();
			// 해당 계정에 친구 추가   
			} else if (what == 4) {
				String userId = "'" + request.getParameter("id") + "'";
				String friendId = "'" + request.getParameter("friend_id") + "'";
				dc.addFriend(userId, friendId);

				response.setContentType("text/plain; charset=UTF-8");

				PrintWriter pw = response.getWriter();

				JSONObject friends = dc.getFriends(userId);

				pw.println(friends.toJSONString());
				pw.close();
			//  해당 계정에 계좌 추가 및 계정 목록  
			} else if (what == 5) {
				String userId = "'" + request.getParameter("id") + "'";
				String newAccount = "'" + request.getParameter("new_account") + "'";

				dc.addAccount(userId, newAccount);
				response.setContentType("text/plain; charset=UTF-8");

				PrintWriter pw = response.getWriter();

				JSONObject accounts = dc.getAccounts(userId);

				pw.println(accounts.toJSONString());
				pw.close();
			// 해당 빚에 돈 갚기  
			} else if (what == 6) {
				String userId = "'" + request.getParameter("id") + "'";
				String loansId = request.getParameter("loans_id");
				int money = Integer.parseInt(request.getParameter("money"));
				dc.setPay(loansId, money);

				response.setContentType("text/plain; charset=UTF-8");
				PrintWriter pw = response.getWriter();
				JSONObject jsonObject = new JSONObject();
				JSONArray jsonArray = new JSONArray();
				
				JSONObject creditor = dc.getCreditor(userId);
				JSONObject debtor = dc.getDebtor(userId);
				
				jsonArray.add(creditor);
				jsonArray.add(debtor);
				
				jsonObject.put("info", jsonArray);
				System.out.println(jsonObject.toJSONString());
				pw.print(jsonObject.toJSONString());

				pw.close();
			// 해당 빚 삭제 하기  
			} else if (what == 7) {
				String userId = "'" + request.getParameter("id") + "'";
				String loansId = request.getParameter("loans_id");

				dc.removeLoan(loansId);

				response.setContentType("text/plain; charset=UTF-8");
				PrintWriter pw = response.getWriter();
				
				JSONObject jsonObject = new JSONObject();
				JSONArray jsonArray = new JSONArray();
				
				JSONObject creditor = dc.getCreditor(userId);
				JSONObject debtor = dc.getDebtor(userId);
				
				jsonArray.add(creditor);
				jsonArray.add(debtor);
				
				jsonObject.put("info", jsonArray);
				System.out.println(jsonObject.toJSONString());
				pw.print(jsonObject.toJSONString());

				pw.close();
			}
		} catch (SQLException sqlEx) {
			sqlEx.printStackTrace();
		} catch(Exception ex){
			ex.printStackTrace();
		}
	}

}
