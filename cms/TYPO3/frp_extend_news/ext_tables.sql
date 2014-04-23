# this SQL extends the existing table tx_news_domain_model_news if 
# it has already been created by the News (tx_news) extension.
CREATE TABLE tx_news_domain_model_news (
	new_field varchar(250) DEFAULT '' NOT NULL
);