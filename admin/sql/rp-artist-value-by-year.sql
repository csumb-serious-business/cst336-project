-- query --
SELECT a.`name`, m.`year`,
       CONCAT('$', FORMAT(SUM(i.`sale_price`), 2))                   as `sale_value`,
       CONCAT('$', FORMAT(SUM(i.`requisition_price`), 2))            as `cost`,
       CONCAT('$', FORMAT(
                   SUM(i.`sale_price`) - SUM(i.`requisition_price`), 2)) as `projected_profit`
FROM `inventory` i
         JOIN `masterpiece` m ON m.`id` = i.`masterpiece_id`
         JOIN `artist` a ON a.`id` = m.`artist_id`
GROUP BY m.`year`, a.`name`
ORDER BY LENGTH(`projected_profit`), `projected_profit` 

/* SAMPLE OUTPUT
Outputs the artist value by year in ascending projected profit.
Example: A Pablo Picasso from 1932 is more profitable than a Pablo Picasso from 1941.
Example2: Art from Leonardo da Vinci makes more profit than Henry Moore.
Louise Bourgeois	1997	$33,840,000.00	$23,970,000.00	$9,870,000.00
Pablo Picasso	1941	$34,920,000.00	$24,735,000.00	$10,185,000.00
Henry Moore	1951	$36,120,000.00	$25,585,000.00	$10,535,000.00
unknown	883-859 BCE	$37,200,000.00	$26,350,000.00	$10,850,000.00
Constantin Brancusi	1914-1917	$45,120,000.00	$31,960,000.00	$13,160,000.00
unknown	3000-2800 BCE	$68,640,000.00	$48,620,000.00	$20,020,000.00
Amedeo Modigliani	1910-1912	$71,400,000.00	$50,575,000.00	$20,825,000.00
Wang Meng	1350	$83,040,000.00	$58,820,000.00	$24,220,000.00
Qi Baishi	1946	$87,480,000.00	$61,965,000.00	$25,515,000.00
Jeff Koons	1986	$109,320,000.00	$77,435,000.00	$31,885,000.00
Claude Monet	1919	$112,440,000.00	$79,645,000.00	$32,795,000.00
Titian	1533	$114,360,000.00	$81,005,000.00	$33,355,000.00
Andy Warhol	1963	$139,680,000.00	$98,940,000.00	$40,740,000.00
Edvard Munch	1895	$157,080,000.00	$111,265,000.00	$45,815,000.00
Alberto Giacometti	1947	$169,560,000.00	$120,105,000.00	$49,455,000.00
Vincent van Gogh	1890	$189,840,000.00	$134,470,000.00	$55,370,000.00
Pablo Picasso	1932	$200,040,000.00	$141,695,000.00	$58,345,000.00
Gustav Klimt	1907	$201,360,000.00	$142,630,000.00	$58,730,000.00
Roy Lichtenstein	1962	$202,440,000.00	$143,395,000.00	$59,045,000.00
Mark Rothko	1951	$236,400,000.00	$167,450,000.00	$68,950,000.00
Paul Gauguin	1892	$252,000,000.00	$178,500,000.00	$73,500,000.00
Jackson Pollock	1948	$253,200,000.00	$179,350,000.00	$73,850,000.00
Paul Cezanne	1894-1895	$333,600,000.00	$236,300,000.00	$97,300,000.00
Willem de Kooning	1955	$380,400,000.00	$269,450,000.00	$110,950,000.00
Leonardo da Vinci	1500	$540,360,000.00	$382,755,000.00	$157,605,000.00 */