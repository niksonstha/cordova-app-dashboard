package ApiRequest;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;

public class ApiRequest extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("makeAPIRequest")) {
            String url = args.getString(0);
            JSONObject headers = args.getJSONObject(1);
            this.makeAPIRequest(url, headers, callbackContext);
            return true;
        }
        return false;
    }

    private void makeAPIRequest(String url, JSONObject headers, CallbackContext callbackContext) {
        cordova.getThreadPool().execute(() -> {
            try {
                URL apiUrl = new URL(url);
                HttpURLConnection urlConnection = (HttpURLConnection) apiUrl.openConnection();

                // Add headers to the request
                Iterator<String> keys = headers.keys();
                while (keys.hasNext()) {
                    String key = keys.next();
                    String value = headers.getString(key);
                    urlConnection.setRequestProperty(key, value);
                }

                // Get the response
                InputStream inputStream = urlConnection.getInputStream();
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    response.append(line);
                }

                // Close connections
                bufferedReader.close();
                inputStream.close();
                urlConnection.disconnect();

                // Parse response as JSON and return
                JSONArray jsonResponseArray = new JSONArray(response.toString());
                callbackContext.success(jsonResponseArray);

            } catch (IOException | JSONException e) {
                e.printStackTrace();
                callbackContext.error("Error occurred during API request: " + e.getMessage());
            }
        });
    }
}
