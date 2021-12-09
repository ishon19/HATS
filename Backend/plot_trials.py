#%% 
import pandas as pd
import matplotlib.pyplot as plt

#%% 
data = pd.read_csv("data.csv")

#%% 
data.plot(x = "Date", y = "Mexico_rolling")

# %%
data.plot(x = "Date", y = "India_rolling")

# %%
data.plot(x = "Date", y = "US_rolling")

# %%