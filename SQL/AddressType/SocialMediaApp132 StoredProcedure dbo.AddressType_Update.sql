USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[AddressType_Update]    Script Date: 9/11/2018 10:10:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Update an address type>
-- =============================================
ALTER PROCEDURE [dbo].[AddressType_Update]
	-- Add the parameters for the stored procedure here
	@Id int,
	@TypeName nvarchar(50),
	@TypeDescription nvarchar(200)
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[AddressType_Update]
		@Id = 1,
		@TypeName = N'Business',
		@TypeDescription = N'Business Address'

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Update dbo.AddressType
	set TypeName = @TypeName,
	TypeDescription = @TypeDescription
	where Id = @Id
END
