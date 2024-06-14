#Import necessary packages
import pandas as pd
import numpy as np


#Reading CSV file
louisville_sales_df = pd.read_csv('sales_data.csv')


### Initial data exploration
#print(louisville_sales_df.shape) -- check number of rows and columns

# Checking the data types of the data set
# louisville_sales_df.dtypes  -- datatype description for columns

# Converting the data types to date format
louisville_sales_df['SaleDate'] = pd.to_datetime(louisville_sales_df['SaleDate'], errors='coerce')
louisville_sales_df['ReportDate'] = pd.to_datetime(louisville_sales_df['ReportDate'], errors='coerce')
louisville_sales_df['ActualPrice'] = pd.to_numeric(louisville_sales_df['ActualPrice'], errors='coerce')
louisville_sales_df['Quantity'] = pd.to_numeric(louisville_sales_df['Quantity'], errors='coerce')
louisville_sales_df['SalesTax'] = pd.to_numeric(louisville_sales_df['SalesTax'], errors='coerce')


# Checking percentage of null values due to coercing
na_percentage_actual_price = np.mean(louisville_sales_df['ActualPrice'].isna()) * 100
print(f'% of NaNs in ActualPrice: {na_percentage_actual_price:.2f}%')

na_percentage_qty = np.mean(louisville_sales_df['Quantity'].isna()) * 100
print(f'% of NaNs in QTY: {na_percentage_qty:.2f}%')


# Metric 1: Total Sales Amount
louisville_sales_df['SalesAmt'] = louisville_sales_df['ActualPrice']* louisville_sales_df['Quantity']


# TOTAL SALES AMOUNT
totalSalesAmount = louisville_sales_df['SalesAmt'].sum()

print(f'Total sales amount is: {totalSalesAmount}')


# Write totalSalesAmount to the text file
with open('./src/main/resources/totalSalesAmount.txt', 'w') as file:
    file.write(str(totalSalesAmount))


# Metric 2: Best selling product by quantity
totalQuantityByProduct = louisville_sales_df.groupby(['ItemDescription','ItemID','SaleDate'])[['Quantity']].sum().sort_values(by = 'Quantity', ascending=False).reset_index()
print(f'Total quantity by product: {totalQuantityByProduct}')

#Write total products by quantity to csv file
totalQuantityByProduct.to_csv('./src/main/resources/totalQuantityByProduct.csv', index = False)

# Metric 3:  Sales Trend Over time:

monthly_sales_trend = louisville_sales_df.resample('M', on='SaleDate').sum(numeric_only=True)['SalesAmt']

monthly_sales_trend_df = monthly_sales_trend.reset_index()

#Write monthly trends to csv file
monthly_sales_trend_df.to_csv('./src/main/resources/monthlySalesTrend.csv', index = False)


# Metric 4: Best selling product by quantity - first item in this set as it's sorted in descending order.
totalSalesByProduct = louisville_sales_df.groupby(['ItemDescription','ItemID','SaleDate'])[['SalesAmt']].sum().sort_values(by = 'SalesAmt', ascending=False).reset_index()
print(f'Total quantity by product: {totalSalesByProduct}')

#Write total products by quantity to csv file
totalSalesByProduct.to_csv('./src/main/resources/totalSalesByProduct.csv', index = False)